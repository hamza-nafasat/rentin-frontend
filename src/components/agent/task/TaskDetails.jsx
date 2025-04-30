'use client';
import { Done, Progress, Todo } from '@/assets/icon';
import CustomLineChart from '@/components/shared/charts/CustomLineChart';
import PropertiesRented from '@/components/tenant/dashboard/PropertiesRented';
import RecentActivities from '@/components/tenant/dashboard/RecentActivities';
import {
  activitiesData,
  DoneTasks,
  earningsData,
  InProgressTasks,
  taskStatuses,
  ToDoTasks,
} from '@/data/data';
import { useEffect, useState, useMemo } from 'react';
import AgentTaskHeader from './AgentTaskHeader';
import CalendarComponent from './Calender';
import TaskCard from './TaskCard';

const TaskColumn = ({ icon: Icon, title, tasks, borderColor, bgColor, textColor }) => (
  <div
    className={`rounded-lg border-[0.6px] ${borderColor} ${bgColor} h-auto px-[18px] py-[21px] shadow-lg`}
  >
    <div className="mb-7 flex items-center gap-2">
      <Icon />
      <p className={`text-base font-semibold ${textColor}`}>{title}</p>
    </div>
    <div className="flex flex-col gap-4">
      {tasks.map((item, index) => (
        <TaskCard key={index} data={item} />
      ))}
    </div>
  </div>
);

function TaskDetails() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const taskColumns = useMemo(
    () => [
      {
        icon: Todo,
        title: 'To Do',
        tasks: ToDoTasks,
        borderColor: 'border-[#0245A5]',
        bgColor: 'bg-[#0245A5]/6',
        textColor: 'text-primary',
      },
      {
        icon: Progress,
        title: 'In Progress',
        tasks: InProgressTasks,
        borderColor: 'border-[#FDAC3B]',
        bgColor: 'bg-[#FDAC3B]/6',
        textColor: 'text-[#FDAC3B]',
      },
      {
        icon: Done,
        title: 'Done',
        tasks: DoneTasks,
        borderColor: 'border-[#39DA4C]',
        bgColor: 'bg-[#39DA4C]/6',
        textColor: 'text-[#39DA4C]',
      },
    ],
    []
  );

  return (
    <div>
      <h3 className="text-textColor text-lg font-semibold md:text-[22px]">Task Details</h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-7 lg:col-span-8">
            <div>
              <PropertiesRented data={taskStatuses} title={'Total Task'} />
            </div>
            <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm lg:p-5">
              <CustomLineChart earningsData={earningsData} isLoading={isLoading} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <div className="flex flex-col gap-4">
              <div className="rounded-lg border bg-white p-4 shadow-sm lg:p-5">
                <CalendarComponent />
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm lg:p-5">
                <RecentActivities cn={'h-[200px]'} data={activitiesData} />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4">
          <AgentTaskHeader />
          <div className="mt-4 grid grid-cols-1 items-start gap-4 md:grid-cols-3">
            {taskColumns.map((column, index) => (
              <TaskColumn key={index} {...column} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
