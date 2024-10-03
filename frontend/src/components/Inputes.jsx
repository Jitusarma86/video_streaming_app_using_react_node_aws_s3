import React, { useId } from "react"
export const InputFile = React.forwardRef(function InputFile({
    label,
    type = File,
    name,
    className,
    ...props
}, ref) {
    const id = useId()
    return (
        <>
            <div>
                {label && <label htmlFor={id} className="lable">{label}</label>}
            </div>
            <div>
                <input
                    type={type}
                    name={name}
                    id={id}
                    ref={ref}
                    className={`file ${className}`}
                    {...props}
                />
            </div>
        </>
    )
})

export const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    name,
    className,
    ...props
}, ref) {
    const id = useId()
    return (
        <>
            <div>
                {label && <label htmlFor={id} className="lable">{label}</label>}
            </div>
            <div>
                <input
                    type={type}
                    name={name}
                    id={id}
                    ref={ref}
                    className={`input ${className}`}
                    {...props}
                />
            </div>
        </>
    )
})

export const Btn = React.forwardRef(function Btn({
    children,
    type = "button",
    onClick,
    className,
    ...props

}, ref) {
    return (
        <div>
            <button
                type={type}
                className={`btn ${className}`}
                onClick={onClick}
                {...props}
            >
                {children}
            </button>
        </div >
    )
})