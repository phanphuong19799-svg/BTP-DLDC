import imgImage1 from "figma:asset/0b9fbf72a74cf9ec02b7371d312e91e368f930d8.png";

export default function Container() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-full" data-name="Container">
      <div className="h-[40px] relative shrink-0 w-[30px]" data-name="image 1">
        <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
        <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[40px] w-[30px]" />
      </div>
    </div>
  );
}