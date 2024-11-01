
import { useSelector } from "react-redux"

export default function ThemeProvider({children}) {
    const {theme} = useSelector(state=>state.theme)

  return (
    <div className={theme}>
        <div className="bg-white text-gray-600 dark:text-slate-50 dark:bg-[#222222] min-h-screen">
            {children}
        </div>
    </div>
  )
}
