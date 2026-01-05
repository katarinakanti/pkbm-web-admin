import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type JSX,
} from "react";
// import { Footer } from "./Footer";
import { Header } from "./Header";

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  parentClassName?: string;
  noHeader?: boolean;
  noFooter?: boolean;
  noPaddingHorizontal?: boolean;
  noBackground?: boolean;
  noBackgroundOnMobile?: boolean;
  headerSiblingEl?: JSX.Element;
}

export function Layout(props: LayoutProps) {
  const ref_on_top = useRef<HTMLDivElement>(null);
  const [on_top, setOnTop] = useState<boolean>(true);

  useEffect(() => {
    if (ref_on_top.current) {
      const ob = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) =>
          setOnTop(entries[0].isIntersecting)
      );
      ob.observe(ref_on_top.current);
      return () => {
        ob.disconnect();
        if (ref_on_top.current) {
          ob.unobserve(ref_on_top.current);
        }
      };
    }
  }, [ref_on_top]);

  return (
    <div className={props.parentClassName}>
      {/* HEADER */}
      {!props.noHeader && (
        <div className="sticky top-0 z-[9]">
          <Header />
          {props.headerSiblingEl && (
            <div
              className={`border-t border-t-px border-t-transparent ${
                !on_top || props.noBackground
                  ? "bg-white shadow-[0px_1px_5px_rgba(0,0,0,.04)] border-t-zinc-100"
                  : "bg-transparent"
              }`}
            >
              {props.headerSiblingEl}
            </div>
          )}
        </div>
      )}
      {/* Empty div */}
      <div ref={ref_on_top} />
      {/* MAIN / CONTENT */}
      <div
        {...props}
        className={`${
          props.noPaddingHorizontal ? "" : "px-6 xl:px-[14%]"
        } flex-1 py-7 pb-20 ${props.className || ""} z-1`}
      >
        {props.children}
      </div>
      {/* FOOTER */}
      {/* {!props.noFooter && <Footer />} */}
      {/* Background absolute */}
      {/* {!props.noBackground && (
        <img
          className={`absolute top-0 right-0 w-[48%] max-h-screen z-[0] opacity-10 ${
            props.noBackgroundOnMobile ? "hidden md:block" : ""
          }`}
          src={"/logo_gram_1.webp"}
        />
      )} */}
    </div>
  );
}
