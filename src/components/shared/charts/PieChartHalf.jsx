'use client';

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export function PieChartHalf({ title, data, config, totalLabel }) {
  const totalValue = Object.keys(config).reduce((sum, key) => sum + (data[0][key] || 0), 0);

  return (
    <Card className="!p-4 lg:!p-5">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-textColor text-center text-base font-semibold">
          {title}
        </CardTitle>
      </CardHeader>

      {/* Dynamic Labels (Earned & Withdrawn Amounts) */}
      <div className="flex justify-between px-4">
        {Object.keys(config).map((key, index) => (
          <div key={index}>
            <div className="flex items-center gap-1">
              <div
                className="size-[10px] rounded-full"
                style={{ backgroundColor: config[key].color }}
              ></div>
              <h6 className="text-sm text-[#76808D]">{config[key].label}</h6>
            </div>
            <p className="text-textColor mt-2 text-base font-medium md:text-lg">
              ${data[0][key].toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={config}
          className="mx-auto -mb-[7rem] aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={data}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
            paddingAngle={5}
            barGap={10}
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) =>
                  viewBox && 'cx' in viewBox && 'cy' in viewBox ? (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 16}
                        className="fill-foreground text-textColor text-2xl font-bold"
                      >
                        ${totalValue.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 4}
                        className="fill-muted-foreground text-sm text-[#71717A]"
                      >
                        {totalLabel}
                      </tspan>
                    </text>
                  ) : null
                }
              />
            </PolarRadiusAxis>
            {Object.keys(config).map((key, index) => (
              <RadialBar
                key={index}
                dataKey={key}
                stackId="a"
                cornerRadius={5}
                fill={config[key].color}
                className="stroke-transparent stroke-2"
              />
            ))}
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
