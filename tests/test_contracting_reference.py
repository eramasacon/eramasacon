"""Synthetic offline extraction integration tests; no production data."""
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / 'scripts/prepare-contracting-reference.py'
FIXTURES = ROOT / 'tests/fixtures'


class ExtractionTests(unittest.TestCase):
    def extract(self, source='wordpress-synthetic.xml', *extra):
        tmp = tempfile.TemporaryDirectory()
        self.addCleanup(tmp.cleanup)
        output = Path(tmp.name) / 'output'
        flag = '--xml' if source.endswith('.xml') else '--sql'
        result = subprocess.run([sys.executable, str(SCRIPT), flag, str(FIXTURES/source),
                                 '--output-dir', str(output), *extra], text=True, capture_output=True)
        return result, output

    def test_xml_and_sql_safety_and_classification(self):
        for source in ('wordpress-synthetic.xml', 'wordpress-synthetic.sql'):
            with self.subTest(source=source):
                result, out = self.extract(source)
                self.assertEqual(result.returncode, 0, result.stderr)
                inv = {p['id']:p for p in json.loads((out/'page-inventory.json').read_text())}
                self.assertEqual(inv[1]['division'], 'contracting')
                self.assertEqual(inv[2]['division'], 'contracting')
                self.assertEqual(inv[3]['division'], 'trading')
                self.assertEqual(inv[4]['division'], 'unresolved')
                self.assertEqual(inv[5]['status'], 'draft')
                self.assertFalse(inv[5]['presentation_eligible'])
                self.assertEqual(inv[6]['role'], 'template')
                self.assertEqual(inv[7]['role'], 'form')
                self.assertEqual(inv[8]['role'], 'revision')
                self.assertEqual(inv[9]['division'], 'unresolved')  # conflicting parent/title
                self.assertEqual(inv[11]['division'], 'contracting')  # menu evidence
                self.assertFalse(inv[12]['presentation_eligible'])  # password protected
                self.assertEqual(inv[13]['status'], 'private')
                self.assertNotIn(90, inv)  # submission custom type excluded
                layout = json.loads((out/'elementor-layouts/1.json').read_text())
                self.assertEqual(layout['elements'][0]['settings']['title']['text'], 'Contracting expertise')
                self.assertEqual(layout['elements'][1]['settings'], {})
                self.assertEqual(layout['elements'][1]['elements'], [])
                self.assertEqual(layout['elements'][2]['settings'], {})
                dump = '\n'.join(p.read_text() for p in out.rglob('*') if p.is_file())
                for secret in ['SYNTHETIC_SECRET', 'PRIVATE_DRAFT', 'PRIVATE_FORM', 'PRIVATE_REVISION',
                               'PRIVATE_PROTECTED', 'PRIVATE_STATUS', 'FAKE_USER_RECORD',
                               'PRIVATE_SUBMISSION', 'form_recipient', 'smtp_password', '?token=', 'onclick', '<script']:
                    self.assertNotIn(secret, dump)
                assets = json.loads((out/'asset-manifest.json').read_text())
                self.assertTrue(any(a['relative_path'] == '/wp-content/uploads/2026/site.jpg' and 1 in a['page_ids'] for a in assets))
                self.assertTrue(any(a['relative_path'] == '/wp-content/uploads/2026/attachment.jpg' and 1 in a['page_ids'] for a in assets))
                self.assertTrue(all(not a['copy_approved'] for a in assets))
                self.assertEqual({p['id'] for p in json.loads((out/'excluded-trading-pages.json').read_text())}, {3})

    def test_deterministic(self):
        for source in ('wordpress-synthetic.xml', 'wordpress-synthetic.sql'):
            _, a = self.extract(source); _, b = self.extract(source)
            snapshot = lambda root: {str(p.relative_to(root)):p.read_bytes() for p in root.rglob('*') if p.is_file()}
            self.assertEqual(snapshot(a), snapshot(b))

    def test_unsafe_sql_fails_without_source_leak_or_output(self):
        for source in ('unsupported.sql', 'invalid.sql'):
            result, output = self.extract(source)
            self.assertNotEqual(result.returncode, 0)
            self.assertNotIn('SYNTHETIC_SECRET', result.stderr + result.stdout)
            self.assertFalse(output.exists())

    def test_xml_entities_rejected(self):
        result, output = self.extract('entities.xml')
        self.assertNotEqual(result.returncode, 0)
        self.assertFalse(output.exists())

    def test_wrong_prefix_and_nonempty_output(self):
        result, _ = self.extract('wordpress-synthetic.sql', '--table-prefix', 'other_')
        self.assertNotEqual(result.returncode, 0)
        result, out = self.extract()
        before = (out/'page-inventory.json').read_bytes()
        result = subprocess.run([sys.executable, str(SCRIPT), '--xml', str(FIXTURES/'wordpress-synthetic.xml'),
                                 '--output-dir', str(out)], capture_output=True)
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(before, (out/'page-inventory.json').read_bytes())

    def test_standard_create_schema_and_custom_type_opt_in(self):
        result, out = self.extract('schema.sql', '--public-post-type', 'project')
        self.assertEqual(result.returncode, 0, result.stderr)
        inv = json.loads((out/'page-inventory.json').read_text())
        self.assertEqual(inv[0]['type'], 'project')
        self.assertEqual(inv[0]['division'], 'unresolved')

if __name__ == '__main__':
    unittest.main()
