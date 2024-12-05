const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-center rounded-md shadow-md py-6 border-t-4 border-gray-200">
      <p className="text-gray-700 text-md">
        &copy; {new Date().getFullYear()} Farmersuccess Marketplace.{" "}
        <br className="lg:hidden" /> All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
