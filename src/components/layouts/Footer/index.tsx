import Link from 'next/link';

const Footer = () => {
  return (
    <footer
      className="py-7 px-7 border-t border-stroke flex gap-2 bg-primary text-primary text-h3"
      id="header"
    >
      <span>INST:</span>
      <Link href="https://www.instagram.com/daarry.s/">daarry.s</Link>
    </footer>
  );
};

export default Footer;
