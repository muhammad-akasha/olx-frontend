"use client";

import { useNav } from "../Contexts/NavbarContext";
import Image from "next/image";
import React from "react";

const Footer = () => {
  const { homeNav, setHomeNav } = useNav(); // Ensure context exists

  return (
    <>
      {homeNav ? (
        <footer>
          <div className="bg-[#ebeeef] border-t border-[rgba(0,47,52,0.2)] pt-3 pb-6 ">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Popular Categories */}
              <div>
                <h3 className="font-bold text-lg mb-4">Popular Categories</h3>
                <ul className="text-[#002F34A3] text-[12px]">
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-black text-[#002F34A3]"
                    >
                      Cars
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-black text-[#002F34A3]"
                    >
                      Flats for rent
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-black text-[#002F34A3]"
                    >
                      Mobile Phones
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-black text-[#002F34A3]"
                    >
                      Jobs
                    </a>
                  </li>
                </ul>
              </div>

              {/* Trending Searches */}
              <div>
                <h3 className="font-bold text-lg mb-4">Trending Searches</h3>
                <ul className="text-[#002F34A3] text-[12px]">
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-black text-[#002F34A3]"
                    >
                      Bikes
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-black text-[#002F34A3]"
                    >
                      Watches
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-black text-[#002F34A3]"
                    >
                      Books
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-black text-[#002F34A3]"
                    >
                      Dogs
                    </a>
                  </li>
                </ul>
              </div>

              {/* About Us */}
              <div>
                <h3 className="font-bold text-lg mb-4">About Us</h3>
                <ul className="text-[#002F34A3] text-[12px]">
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-black text-[#002F34A3]"
                    >
                      About Dubizzle Group
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-black text-[#002F34A3]"
                    >
                      OLX Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-black text-[#002F34A3]"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-black text-[#002F34A3]"
                    >
                      OLX for Businesses
                    </a>
                  </li>
                </ul>
              </div>

              {/* Help & Legal */}
              <div>
                <h3 className="font-bold text-lg mb-4">Help & Legal</h3>
                <ul className="text-[#002F34A3] text-[12px]">
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-black text-[#002F34A3]"
                    >
                      OLX
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-black text-[#002F34A3]"
                    >
                      Help
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-black text-[#002F34A3]"
                    >
                      Sitemap
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-black text-[#002F34A3]"
                    >
                      Terms of Use
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:underline hover:text-black text-[#002F34A3]"
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div>
                  <h5 className="uppercase font-semibold text-[14px]">
                    Follow us
                  </h5>
                </div>
                <div className="flex gap-2">
                  <Image
                    width={25}
                    height={25}
                    className="rounded-full"
                    alt="social-logos"
                    src={"/iconFacebook.svg"}
                  />
                  <Image
                    width={25}
                    height={25}
                    className="rounded-full"
                    alt="social-logos"
                    src={"/iconInstagram.svg"}
                  />

                  <Image
                    width={25}
                    height={25}
                    className="rounded-full"
                    alt="social-logos"
                    src={"/iconYoutube.svg"}
                  />
                  <Image
                    width={25}
                    height={25}
                    className="rounded-full"
                    alt="social-logos"
                    src={"/iconTwitter.svg"}
                  />
                </div>
                <div className="mt-5 flex gap-1">
                  <Image
                    src={"/iconAppGallery.svg"}
                    width={84}
                    height={28}
                    alt="stores"
                  />
                  <Image
                    src={"/iconAppStore.svg"}
                    width={84}
                    height={28}
                    alt="stores"
                  />
                  <Image
                    src={"/iconGooglePlay.svg"}
                    width={84}
                    height={28}
                    alt="stores"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#002f34] py-2 px-5 text-white">
            <p className="text-right text-[12px]">
              <strong>Free Classifieds in Pakistan</strong> . © 2006-2024 OLX
            </p>
          </div>
        </footer>
      ) : null}
    </>
  );
};

export default Footer;
