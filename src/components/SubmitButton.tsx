// "use client";

// import { Button } from "@/components/ui/button";
// import { LoaderCircle } from 'lucide-react';

// import { useFormStatus } from "react-dom";

// const SubmitButton = () => {
//     const { pending } = useFormStatus();
//     console.log('pending', pending);
//     return (
//         <Button className="relative w-full font-semibold">
//                      <span className="{pending && 'text-transparent': ''}">submit</span>  
//                      {pending && (
//                         <span className="absolute flex items-center justify-center w-full h-full text grey-400">
//                             <LoaderCircle className="animate-spin" />
//                         </span>
//                      )} 
//                     </Button>
//     )
// }

// export default SubmitButton;


// "use client";

// import { Button } from "@/components/ui/button";
// import { LoaderCircle } from "lucide-react";
// import { useFormStatus } from "react-dom";

// const SubmitButton = () => {
//   const { pending } = useFormStatus();
//   console.log("pending", pending);

//   return (
//     <Button className="relative w-full font-semibold" disabled={pending}>
//       <span className={pending ? "text-transparent" : ""}>Submit</span>  
//       {pending && (
//         <span className="absolute flex items-center justify-center w-full h-full text-gray-400">
//           <LoaderCircle className="animate-spin w-5 h-5" />
//         </span>
//       )}
//     </Button>
//   );
// };

// export default SubmitButton;


"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button className="relative w-full font-semibold" type="submit" disabled={pending}>
            <span className={pending ? "text-transparent" : ""}>Submit</span>  
            {pending && (
                <span className="absolute flex items-center justify-center w-full h-full text-gray-400">
                    <LoaderCircle className="animate-spin" />
                </span>
            )} 
        </Button>
    );
};

export default SubmitButton;
