-- Synthetic data only; never executed.
INSERT INTO `wp_posts` (`ID`,`post_title`,`post_name`,`post_parent`,`post_status`,`post_type`,`post_content`,`post_password`,`menu_order`) VALUES
(1,'Contracting','contracting',0,'publish','page','<h1>Contracting</h1><a href="/trading/">Trading</a><img src="/wp-content/uploads/2026/site.jpg"><form><input value="SYNTHETIC_SECRET"><p>PRIVATE_FORM</p></form><script>SYNTHETIC_SECRET</script>','',0),
(2,'Civil works','civil-works',1,'publish','page','','',0),
(3,'Trading','trading',0,'publish','page','','',0),
(4,'About','about',0,'publish','page','','',0),
(5,'PRIVATE_DRAFT','private_draft',0,'draft','page','PRIVATE_DRAFT','',0),
(6,'Header','header',0,'publish','elementor_library','','',0),
(7,'PRIVATE_FORM','private_form',0,'publish','metform-form','PRIVATE_FORM','',0),
(8,'PRIVATE_REVISION','private_revision',0,'inherit','revision','PRIVATE_REVISION','',0),
(9,'Trading mixed','trading-mixed',1,'publish','page','','',0),
(10,'Services','services',0,'publish','nav_menu_item','','',0),
(11,'Services','services',0,'publish','page','','',0),
(12,'PRIVATE_PROTECTED','private_protected',0,'publish','page','PRIVATE_PROTECTED','SYNTHETIC_SECRET',0),
(13,'PRIVATE_STATUS','private_status',0,'private','page','PRIVATE_STATUS','',0),
(20,'Project image','project-image',1,'inherit','attachment','','',0),
(90,'PRIVATE_SUBMISSION','private_submission',0,'publish','metform-entry','PRIVATE_SUBMISSION','',0);
INSERT INTO `wp_postmeta` (`post_id`,`meta_key`,`meta_value`) VALUES
(1,'_elementor_data','[{"id": "a1", "elType": "widget", "widgetType": "heading", "settings": {"title": "<h2>Contracting expertise</h2>", "smtp_password": "SYNTHETIC_SECRET", "unknown_setting": "SYNTHETIC_SECRET", "link": {"url": "https://example.invalid/contact/?token=SYNTHETIC_SECRET"}, "image": {"id": 20, "url": "https://example.invalid/wp-content/uploads/2026/site.jpg?size=large"}, "padding": {"unit": "px", "top": "20", "secret": "SYNTHETIC_SECRET"}}, "elements": []}, {"id": "a2", "elType": "widget", "widgetType": "metform", "settings": {"title": "PRIVATE_FORM", "form_recipient": "SYNTHETIC_SECRET"}, "elements": [{"id": "child", "settings": {"title": "PRIVATE_FORM"}}]}, {"id": "a3", "elType": "widget", "widgetType": "html", "settings": {"html": "<script>SYNTHETIC_SECRET</script>"}}]'),
(1,'_thumbnail_id','20'),
(1,'smtp_password','SYNTHETIC_SECRET'),
(1,'_elementor_page_settings','SYNTHETIC_SECRET'),
(6,'_elementor_template_type','header'),
(10,'_menu_item_object_id','11'),
(10,'_menu_item_menu_item_parent','0'),
(20,'_wp_attached_file','2026/attachment.jpg');
INSERT INTO `wp_terms` (`term_id`,`name`) VALUES
(1,'Contracting navigation');
INSERT INTO `wp_term_taxonomy` (`term_taxonomy_id`,`term_id`,`taxonomy`) VALUES
(1,1,'nav_menu');
INSERT INTO `wp_term_relationships` (`object_id`,`term_taxonomy_id`) VALUES
(10,1);
INSERT INTO `wp_users` (`ID`,`user_pass`) VALUES
(1,'FAKE_USER_RECORD');
INSERT INTO `wp_options` (`option_name`,`option_value`) VALUES
('smtp_password','SYNTHETIC_SECRET');
INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES (10,'_menu_item_type','post_type'),(10,'_menu_item_object','page');
