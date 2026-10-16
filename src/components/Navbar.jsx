import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, House, Menu, Plus, Scale, X } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { wishlist, comparison } = useApp();
  const links = [{to:"/properties",label:"Explore homes"},{to:"/agents",label:"Our agents"},{to:"/submit-property",label:"List a property"}];
  return <header className="site-header"><div className="container nav-wrap">
    <Link to="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark"><House size={20}/></span><span>estateora<span className="gold">.</span></span></Link>
    <nav className={open ? "main-nav nav-open" : "main-nav"}>{links.map((link) => <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>{link.label}</NavLink>)}<div className="mobile-links"><Link to="/wishlist" onClick={() => setOpen(false)}><Heart size={17}/> Saved homes ({wishlist.length})</Link><Link to="/compare" onClick={() => setOpen(false)}><Scale size={17}/> Compare ({comparison.length})</Link><Link to="/login" onClick={() => setOpen(false)}>Sign in</Link></div></nav>
    <div className="nav-actions"><Link className="nav-icon" to="/wishlist" aria-label="Wishlist"><Heart size={18}/><span>{wishlist.length}</span></Link><Link className="nav-icon" to="/compare" aria-label="Compare"><Scale size={18}/><span>{comparison.length}</span></Link><Link to="/submit-property" className="button button-dark button-small"><Plus size={15}/> List a home</Link></div>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X/> : <Menu/>}</button>
  </div></header>;
}