import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/user.context';
import axios from '../config/axios';
import { useNavigate } from 'react-router-dom';


console.log("ENV value:", import.meta.env.VITE_API_URL);

console.log('Axios Base URL:', axios.defaults.baseURL);


const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [project, setProject] = useState([]);

  const navigate = useNavigate();

  // Function to fetch all projects
  const fetchProjects = () => {
    axios
      .get('/projects/all')
      .then((res) => {
        console.log('📦 project API response:', res.data);
        setProject(res.data.projects);
      })
      .catch((err) => {
        console.log('Base URL:', axios.defaults.baseURL);

        console.log('🚫 Error fetching projects:', err);
      });
  };

  function createProject(e) {
    e.preventDefault();
    console.log({ projectName });

    axios
      .post('/projects/create', {
        name: projectName,
      })
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
        setProjectName('');
        fetchProjects(); // 🔁 refresh project list after creating
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchProjects(); // ⬅️ fetch projects on page load
  }, []);

  return (
    <main className='p-4'>
      <div className='projects flex flex-wrap gap-3'>
        <button
          onClick={() => setIsModalOpen(true)}
          className='project p-4 border border-slate-300 rounded-md'
        >
          New Project
          <i className='ri-link ml-2'></i>
        </button>

        {Array.isArray(project) &&
          project.map((project) => (
            <div
              key={project._id}
              onClick={() => {
                navigate(`/project`, {
                  state: { project },
                });
              }}
              className='project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 hover:bg-slate-200'
            >
              <h2 className='font-semibold'>{project.name}</h2>

              <div className='flex gap-2'>
                <p>
                  {' '}
                  <small>
                    <i className='ri-user-line'></i> Collaborators
                  </small>{' '}
                  :
                </p>
                {project.users.length}
              </div>
            </div>
          ))}
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-md shadow-md w-1/3'>
            <h2 className='text-xl mb-4'>Create New Project</h2>
            <form onSubmit={createProject}>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700'>
                  Project Name
                </label>
                <input
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  type='text'
                  className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
                  required
                />
              </div>
              <div className='flex justify-end'>
                <button
                  type='button'
                  className='mr-2 px-4 py-2 bg-gray-300 rounded-md'
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-600 text-white rounded-md'
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
