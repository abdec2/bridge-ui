import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year}, Bondz Chain
        </Typography>
        <div className="flex items-center gap-4">
          <Typography
            as="a"
            href={'http://brdigitech.com'}
            target="_blank"
            variant="small"
            className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
          >
            Powered By: Brdigitech
          </Typography>
        </div>
      </div>
    </footer>
  );
}


Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
