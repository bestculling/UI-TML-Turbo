const MenuItem = ({ icon: Icon, children, onClick, ...rest }) => (
    <button onClick={onClick} className="flex gap-5 items-center rounded-md text-gray-500 hover:bg-gray-900 p-3" {...rest}>
        {Icon && <Icon className="text-xl" />}
        {children}
    </button>
);

export default MenuItem