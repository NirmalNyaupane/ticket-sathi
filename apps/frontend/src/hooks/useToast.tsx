import { toast, useToast } from "@/components/ui/use-toast"
interface customToast {
    error: (error: string) => void;
    sucess: (message: string) => void;
    warning: (message: string) => void
}
const useCustomToast = () => {
    const toast = useToast();
    const customToast = {} as customToast;

    customToast.error = (error: string) => {
        return toast.toast({
            description: error,
            duration: 1000,
            variant: "destructive",
        })
    }

    customToast.sucess = (description: string) => {
        return toast.toast({
            variant: "default",
            className: "bg-green-600 text-white font-bold",
            description: description,
            duration: 1000,
        })
    }

    customToast.warning = (warning: string) => {
        return toast.toast({
            variant: "default",
            description: warning
        })
    }

    return customToast;
}

export default useCustomToast;