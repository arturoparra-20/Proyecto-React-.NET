export default function Button({
    children,
    onClick,
    type = "button",
    disabled = false,
    className = "btn btn-primary",
}: ButtonProps) {
    return (
        <button type={type} className={className} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
}

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    className?: string;
}
