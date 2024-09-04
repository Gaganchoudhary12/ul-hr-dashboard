import React from "react";
import { RangeCalendar, Button, ButtonGroup, cn } from "@nextui-org/react";
import type { DateValue } from "@react-types/calendar";

import {
  today,
  getLocalTimeZone,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
} from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

interface IRangeDatePicker {
  value: any;
  minValue?: any;
  setValue: any;
}

export default function RangeDatePicker({
  value,
  setValue,
  minValue,
}: IRangeDatePicker) {
  let [focusedValue, setFocusedValue] = React.useState<DateValue>(
    today(getLocalTimeZone())
  );

  let { locale } = useLocale();

  let now = today(getLocalTimeZone());
  let nextMonth = now.add({ months: 1 });

  let nextWeek = {
    start: startOfWeek(now.add({ weeks: 1 }), locale),
    end: endOfWeek(now.add({ weeks: 1 }), locale),
  };
  let nextMonthValue = {
    start: startOfMonth(nextMonth),
    end: endOfMonth(nextMonth),
  };

  return (
    <div className="flex flex-col gap-4">
      <RangeCalendar
        focusedValue={focusedValue}
        nextButtonProps={{
          variant: "bordered",
        }}
        minValue={minValue}
        prevButtonProps={{
          variant: "bordered",
        }}
        topContent={
          <ButtonGroup
            fullWidth
            className="px-3 max-w-full pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
            radius="full"
            size="sm"
            variant="bordered"
          >
            <Button
              onPress={() => {
                setValue(nextWeek);
                setFocusedValue(nextWeek.end);
              }}
            >
              Next week
            </Button>
            <Button
              onPress={() => {
                setValue(nextMonthValue), setFocusedValue(nextMonthValue.start);
              }}
            >
              Next month
            </Button>
          </ButtonGroup>
        }
        value={value}
        onChange={setValue}
        onFocusChange={setFocusedValue}
      />
    </div>
  );
}
