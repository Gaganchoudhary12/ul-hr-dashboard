import { IFeedback } from "@/util/Types";
import React from "react";

const Feedback = ({ feedbackData }: any) => {

  return (
    <div className="flex gap-4">
      {feedbackData.map(
        (item: { type: string; data: IFeedback[] }, key: number) => {
          return (
            item.type !== "dailyMood" && (
              <div key={key} className="min-w-[250px] w-1/3">
                <p className="text-center capitalize text-lg font-semibold pb-1">
                  {item.type}
                </p>
                <div>
                  {!!item?.data.length ? (
                    <>
                      {item?.data.map((data, index) => (
                        <div className="my-3 p-3 rounded bg-purple-800">
                          <p
                            key={index}
                            className="text-center text-white w-full break-words"
                          >
                            {data.comment}
                          </p>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="text-center">No data found</p>
                  )}
                </div>
              </div>
            )
          );
        }
      )}
    </div>
  );
};

export default Feedback;
