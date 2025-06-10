const currentYear: number = new Date().getFullYear()

const Footer = () => {
    return (
        <>
            <footer className="bg-[#F9E4E3]">
                <div className="text-[#BD9192] font-bold text-center py-2">
                    Copyright © {currentYear}. All rights reserved.
                </div>
            </footer>
        </>
    )
}

export default Footer;