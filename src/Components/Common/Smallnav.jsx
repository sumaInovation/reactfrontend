import { File, Home, DollarSign, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, UserPlus,Search } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
const SIDEBAR_ITEMS = [
    {
        name: "Overview",
        icon: Home,
        color: "#6366f1",
        href: "/",
    },
    { name: "Products", icon: ShoppingBag, color: "#8B5CF6", href: "/products" },
    { name: "Sing In", icon: UserPlus, color: "#EC4899", href: "/users" },
    { name: "Reports", icon: File, color: "#10B981", href: "/reports" },
    { name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
    { name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
    { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Smallnav = ({sendValueToParent}) => {
  return (
    <>
    
    
       {SIDEBAR_ITEMS.map((item) => (
                        <Link key={item.href} to={item.href}  onClick={()=>sendValueToParent(false)}>
                            <motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
                                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                <AnimatePresence>
                                
                                        <motion.span
                                            className='ml-4 whitespace-nowrap'
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.1, delay: 0.1 }}
                                        >
                                            {item.name}
                                        </motion.span>
                                
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                    ))}
    

    </>
  )
}

export default Smallnav
