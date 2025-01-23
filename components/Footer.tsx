const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-center rounded-md shadow-md py-5 border-t-4 border-gray-200">
      <div className="flex flex-col gap-1 text-gray-700 text-md">
        <p>
          For customer support:{" "}
          <a className="text-green-800" href="mailto:support@farmersuccess.com">
            support@farmersuccess.com
          </a>
        </p>
        <p>
          &copy; {new Date().getFullYear()} Farmersuccess Marketplace.{" "}
          <br className="lg:hidden" /> All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
