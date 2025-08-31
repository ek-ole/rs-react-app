import { useEffect, useState, type ReactNode } from "react"
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
}

function Portal ({ children }: Props) {
   const [container] = useState(() => document.createElement('div'));


  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    }
  }, [container])

  return createPortal(children, container);
}

export default Portal;