import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/5 py-10 md:py-16 flex flex-col md:flex-row items-center justify-between">
      <div>
        <img className="max-w-12" src={logo} alt="" />
        <div className="max-w-[410px] mt-6 text-card-foreground text-sm leading-relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde
          quaerat eveniet cumque accusamus atque qui error quo enim fugiat?
        </div>
      </div>
      <div className="flex justify-between min-w-[100%] md:min-w-[450px] gap-5 flex-col md:flex-row mt-10">
        <div>
          <h3 class="font-semibold text-base mb-2">Quick Links</h3>
          <ul>
            <li>
              <Link
                class="text-foreground text-xs hover:text-primary"
                to="/"
                data-discover="true"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                class="text-foreground text-xs hover:text-primary"
                to="/"
                data-discover="true"
              >
                Best Sellers
              </Link>
            </li>
            <li>
              <Link
                class="text-foreground text-xs hover:text-primary"
                to="/"
                data-discover="true"
              >
                Offers &amp; Deals
              </Link>
            </li>
            <li>
              <Link
                class="text-foreground text-xs hover:text-primary"
                to="/"
                data-discover="true"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                class="text-foreground text-xs hover:text-primary"
                to="/"
                data-discover="true"
              >
                FAQs
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="font-semibold text-base mb-2">Need Help?</h3>
          <ul>
            <li>
              <Link
                class="text-foreground text-xs hover:text-primary"
                to="/"
                data-discover="true"
              >
                Delivery Information
              </Link>
            </li>
            <li>
              <Link
                class="text-foreground text-xs hover:text-primary"
                to="/"
                data-discover="true"
              >
                Return &amp; Refund Policy
              </Link>
            </li>
            <li>
              <Link
                class="text-foreground text-xs hover:text-primary"
                to="/"
                data-discover="true"
              >
                Payment Methods
              </Link>
            </li>
            <li>
              <Link
                class="text-foreground text-xs hover:text-primary"
                to="/"
                data-discover="true"
              >
                Track your Order
              </Link>
            </li>
            <li>
              <Link
                class="text-foreground text-xs hover:text-primary"
                to="/"
                data-discover="true"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="font-semibold text-base mb-2">Follow Us</h3>
          <ul>
            <li>
              <Link
                class="text-foreground text-xs hover:text-primary"
                to="/"
                data-discover="true"
              >
                Instagram
              </Link>
            </li>
            <li>
              <Link
                class="text-foreground text-xs hover:text-primary"
                to="/"
                data-discover="true"
              >
                Twitter
              </Link>
            </li>
            <li>
              <Link
                class="text-foreground text-xs hover:text-primary"
                to="/"
                data-discover="true"
              >
                Facebook
              </Link>
            </li>
            <li>
              <Link
                class="text-foreground text-xs hover:text-primary"
                to="/"
                data-discover="true"
              >
                YouTube
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
