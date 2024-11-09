import { getClassesInfo } from "./controllers/database-actions";
import StudentsTable from "./controllers/students-table";

const ClassesOverview = async () => {
  const classes = await getClassesInfo();

  return (
    <main className="mt-4">
      <h2 className="text-2xl lg:text-3xl font-semibold text-secondary">
        Classes Overview
      </h2>
      {classes &&
        classes.status &&
        classes.data?.length &&
        classes.data.map((item, index) => (
          <div className="collapse bg-base-200 mt-2" key={index}>
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              {item.class_name} - {item.class_id}
            </div>
            <div className="collapse-content">
              <StudentsTable id={item.class_id.toString()} />
            </div>
          </div>
        ))}
    </main>
  );
};

export default ClassesOverview;
