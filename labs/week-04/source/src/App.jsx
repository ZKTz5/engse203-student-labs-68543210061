import { initialTasks } from './data/initialTasks.js';
import { useState } from 'react';
import AppHeader from './components/AppHeader.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import TaskList from './components/TaskList.jsx';
import FilterBar from './components/FilterBar.jsx';

function App() {
  const [tasks] = useState(initialTasks);
  const [statusFilter, setStatusFilter] = useState('all');

  const summary = {
    total: initialTasks.length,
    todo: initialTasks.filter((task) => task.status === 'todo').length,
    doing: initialTasks.filter((task) => task.status === 'doing').length,
    done: initialTasks.filter((task) => task.status === 'done').length,
  };
  const filteredTasks = statusFilter === 'all'
    ? tasks
    : tasks.filter((task) => task.status === statusFilter);


  return (
    <>
      <AppHeader title="Study Task Board" subtitle="CP02 — Props, map และ stable key" />
      <main className="container page-content">
        <SummaryPanel summary={summary} />
        <section className="panel">
          <h2>รายการฝึกของฉัน</h2>
          <FilterBar
            value={statusFilter}
            onFilterChange={setStatusFilter}
          />
          <TaskList tasks={filteredTasks} />
        </section>
      </main>
    </>
  );
}

export default App;
