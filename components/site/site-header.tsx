// Ported from the rendered WordPress page by scripts/wp-port/port_page.py.
// Markup and class names match the original Elementor output so the original
// stylesheets (public/legacy/css) apply unchanged.
/* eslint-disable @next/next/no-img-element -- original WordPress srcset/sizes markup */
import Link from "next/link";
import { MenuItem, MenuLink } from "@/components/wordpress/menu-item";

export function SiteHeader() {
  return (
  <header id="masthead" itemScope itemType="https://schema.org/WPHeader">
    <div data-elementor-type="wp-post" data-elementor-id="546" className="elementor elementor-546">
      <section className="elementor-section elementor-top-section elementor-element elementor-element-6f1dc27 elementor-hidden-desktop elementor-section-boxed elementor-section-height-default elementor-section-height-default wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no">
        <div className="elementor-container elementor-column-gap-default">
          <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-11d149f">
            <div className="elementor-widget-wrap elementor-element-populated">
              <div className="elementor-element elementor-element-e664213 elementor-align-right elementor-tablet-align-center elementor-mobile-align-center elementor-widget elementor-widget-button">
                <a className="elementor-button elementor-size-sm" role="button">
                  <span className="elementor-button-content-wrapper">
                    <span className="elementor-button-icon">
                      <i aria-hidden="true" className="icon icon-download1" />
                    </span>
                    {" "}
                    <span className="elementor-button-text">
                      Catalogue
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-e96d863">
            <div className="elementor-widget-wrap elementor-element-populated">
              <div className="elementor-element elementor-element-1a94fc2 elementor-align-right elementor-tablet-align-center elementor-mobile-align-center elementor-widget elementor-widget-button">
                <a className="elementor-button elementor-size-sm" role="button">
                  <span className="elementor-button-content-wrapper">
                    <span className="elementor-button-icon">
                      <i aria-hidden="true" className="icon icon-download1" />
                    </span>
                    {" "}
                    <span className="elementor-button-text">
                      Brochure
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="elementor-section elementor-top-section elementor-element elementor-element-4eb7367 header_custom_class elementor-section-boxed elementor-section-height-default elementor-section-height-default wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no">
        <div className="elementor-container elementor-column-gap-default">
          <div className="elementor-column elementor-col-20 elementor-top-column elementor-element elementor-element-9cba4d7">
            <div className="elementor-widget-wrap elementor-element-populated">
              <div className="elementor-element elementor-element-252675a eram_logo elementor-widget elementor-widget-image">
                <Link href="/">
                  <img fetchPriority="high" width="1024" height="272" src="/wp-content/uploads/2025/02/lkjdfldfhg-1024x272.png" className="attachment-large size-large wp-image-565" alt="" decoding="async" srcSet="/wp-content/uploads/2025/02/lkjdfldfhg-1024x272.png 1024w, /wp-content/uploads/2025/02/lkjdfldfhg-300x80.png 300w, /wp-content/uploads/2025/02/lkjdfldfhg-768x204.png 768w, /wp-content/uploads/2025/02/lkjdfldfhg-1536x408.png 1536w, /wp-content/uploads/2025/02/lkjdfldfhg.png 1600w" sizes="(max-width: 1024px) 100vw, 1024px" />
                </Link>
              </div>
            </div>
          </div>
          <div className="elementor-column elementor-col-20 elementor-top-column elementor-element elementor-element-248638e elementor-hidden-mobile empty_div">
            <div className="elementor-widget-wrap" />
          </div>
          <div className="elementor-column elementor-col-20 elementor-top-column elementor-element elementor-element-f3a714e contracting_header">
            <div className="elementor-widget-wrap elementor-element-populated">
              <div className="elementor-element elementor-element-d6741bf ha-has-bg-overlay elementor-widget elementor-widget-ekit-nav-menu">
                <div className="elementor-widget-container">
                  <nav className="ekit-wid-con ekit_menu_responsive_tablet" data-hamburger-icon="jki jki-menu-button-of-three-horizontal-lines-light" data-hamburger-icon-type="icon" data-responsive-breakpoint="1024">
                    <button className="elementskit-menu-hamburger elementskit-menu-toggler" type="button" aria-label="hamburger-icon">
                      <i aria-hidden="true" className="ekit-menu-icon jki jki-menu-button-of-three-horizontal-lines-light" />
                    </button>
                    <div id="ekit-megamenu-menu" className="elementskit-menu-container elementskit-menu-offcanvas-elements elementskit-navbar-nav-default ekit-nav-menu-one-page-yes ekit-nav-dropdown-hover">
                      <ul id="menu-menu-1" className="elementskit-navbar-nav elementskit-menu-po-center submenu-click-on-icon">
                        <MenuItem path="/" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-63 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px">
                          <MenuLink href="/" className="ekit-menu-nav-link menu-link">
                            Home
                          </MenuLink>
                        </MenuItem>
                        <MenuItem path="/about-us" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-62 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px">
                          <MenuLink href="/about-us" className="ekit-menu-nav-link menu-link">
                            About Us
                          </MenuLink>
                        </MenuItem>
                        <MenuItem path="/services" descendantPaths={["/civil-and-mechanical-construction", "/cleaning-services", "/electrical-and-instrumentation", "/fabrication", "/firefighting", "/flooring-and-landscaping", "/hvac-contracting", "/mep-design-consultancy", "/testing-and-air-balancing"]} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-61 nav-item elementskit-dropdown-has relative_position elementskit-dropdown-menu-default_width elementskit-mobile-builder-content" data-vertical-menu="750px">
                          <MenuLink aria-expanded="false" href="/services" className="ekit-menu-nav-link ekit-menu-dropdown-toggle menu-link">
                            Services
                            <i aria-hidden="true" className="icon icon-down-arrow1 elementskit-submenu-indicator" />
                          </MenuLink>
                          <ul className="elementskit-dropdown elementskit-submenu-panel">
                            <MenuItem path="/hvac-contracting" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1423 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px">
                              <MenuLink href="/hvac-contracting" className="dropdown-item menu-link">
                                HVAC Contracting
                              </MenuLink>
                            </MenuItem>
                            <MenuItem path="/electrical-and-instrumentation" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1419 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px">
                              <MenuLink href="/electrical-and-instrumentation" className="dropdown-item menu-link">
                                Electrical and instrumentation
                              </MenuLink>
                            </MenuItem>
                            <MenuItem path="/mep-design-consultancy" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1424 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px">
                              <MenuLink href="/mep-design-consultancy" className="dropdown-item menu-link">
                                MEP Design
                              </MenuLink>
                            </MenuItem>
                            <MenuItem path="/flooring-and-landscaping" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1422 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px">
                              <MenuLink href="/flooring-and-landscaping" className="dropdown-item menu-link">
                                Flooring and landscaping
                              </MenuLink>
                            </MenuItem>
                            <MenuItem path="/civil-and-mechanical-construction" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1418 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px">
                              <MenuLink href="/civil-and-mechanical-construction" className="dropdown-item menu-link">
                                Civil and mechanical construction
                              </MenuLink>
                            </MenuItem>
                            <MenuItem path="/firefighting" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1421 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px">
                              <MenuLink href="/firefighting" className="dropdown-item menu-link">
                                Firefighting
                              </MenuLink>
                            </MenuItem>
                            <MenuItem path="/fabrication" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1420 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px">
                              <MenuLink href="/fabrication" className="dropdown-item menu-link">
                                Fabrication
                              </MenuLink>
                            </MenuItem>
                            <MenuItem path="/testing-and-air-balancing" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2417 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px">
                              <MenuLink href="/testing-and-air-balancing" className="dropdown-item menu-link">
                                Testing and air balancing
                              </MenuLink>
                            </MenuItem>
                            <MenuItem path="/cleaning-services" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2416 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px">
                              <MenuLink href="/cleaning-services" className="dropdown-item menu-link">
                                Cleaning services
                              </MenuLink>
                            </MenuItem>
                          </ul>
                        </MenuItem>
                        <MenuItem path="/portfolio-2" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2907 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px">
                          <MenuLink href="/portfolio-2" className="ekit-menu-nav-link menu-link">
                            Projects
                          </MenuLink>
                        </MenuItem>
                        <MenuItem path="/contact-us" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-64 nav-item elementskit-mobile-builder-content" data-vertical-menu="750px">
                          <MenuLink href="/contact-us" className="ekit-menu-nav-link menu-link">
                            Contact Us
                          </MenuLink>
                        </MenuItem>
                      </ul>
                      <div className="elementskit-nav-identity-panel">
                        <button className="elementskit-menu-close elementskit-menu-toggler" type="button">
                          X
                        </button>
                      </div>
                    </div>
                    <div className="elementskit-menu-overlay elementskit-menu-offcanvas-elements elementskit-menu-toggler ekit-nav-menu--overlay" />
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="elementor-column elementor-col-20 elementor-top-column elementor-element elementor-element-e88b747 empty_div">
            <div className="elementor-widget-wrap" />
          </div>
          <div className="elementor-column elementor-col-20 elementor-top-column elementor-element elementor-element-c6ada0a elementor-hidden-mobile eaheader_button_wrap">
            <div className="elementor-widget-wrap elementor-element-populated">
              <section className="elementor-section elementor-inner-section elementor-element elementor-element-90ca240 elementor-hidden-tablet flex_location_btns elementor-section-boxed elementor-section-height-default elementor-section-height-default wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no">
                <div className="elementor-container elementor-column-gap-default">
                  <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-533dcfd down_btn_first">
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <div className="elementor-element elementor-element-7282dd6 elementor-align-right elementor-widget elementor-widget-button">
                        <a className="elementor-button elementor-size-sm" role="button">
                          <span className="elementor-button-content-wrapper">
                            <span className="elementor-button-icon">
                              <i aria-hidden="true" className="icon icon-download1" />
                            </span>
                            {" "}
                            <span className="elementor-button-text">
                              Catalogue
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-f3afaba down_btn_second">
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <div className="elementor-element elementor-element-d86766b elementor-align-right elementor-widget elementor-widget-button">
                        <a className="elementor-button elementor-button-link elementor-size-sm" href="/wp-content/uploads/2026/02/updated-profile-versions-comp.pdf" target="_blank" rel="nofollow" download="updated-profile-versions-comp.pdf">
                          <span className="elementor-button-content-wrapper">
                            <span className="elementor-button-icon">
                              <i aria-hidden="true" className="icon icon-download1" />
                            </span>
                            {" "}
                            <span className="elementor-button-text">
                              Profile
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  </header>
  );
}
