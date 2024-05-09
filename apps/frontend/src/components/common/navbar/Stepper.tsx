import ConditionallyRender from "../ConditionallyRender";

interface props {
  activeIndex: number;
  totalCount: number;
  className?: string;
}
const Stepper = ({ activeIndex, totalCount, className }: props) => {
  return (
    <div className="flex w-full items-center gap-1">
      {Array(totalCount)
        .fill(0)
        .map((_, index) => {
          return (
            <ConditionallyRender
              key={(index + 1) * 43}
              condition={index === 0}
              show={
                <span
                  className={`min-w-[30px] h-[30px] ${
                    index + 1 === activeIndex
                      ? "bg-red-500"
                      : activeIndex > index
                      ? " bg-green-500"
                      : "bg-black"
                  } rounded-full`}
                ></span>
              }
              elseShow={
                <>
                  <div className="h-[10px] bg-black w-full"></div>
                  <span
                    className={`min-w-[30px] h-[30px] ${
                      index + 1 === activeIndex
                        ? "bg-red-500"
                        : activeIndex > index
                        ? " bg-green-500"
                        : "bg-black"
                    } rounded-full`}
                  ></span>
                </>
              }
            />
          );
        })}
    </div>
  );
};

export default Stepper;
