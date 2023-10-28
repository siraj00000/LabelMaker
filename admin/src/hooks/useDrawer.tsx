import { useState } from 'react'
const useDrawer = () => {
    const [drawerType, setDrawerType] = useState<string>('');
    const toggleDrawer = (type: string) => {
        setDrawerType(type);
    }
    const closeDrawer = () => {        
        setDrawerType('');
    }

    return { drawerType, closeDrawer, toggleDrawer }
}
export default useDrawer