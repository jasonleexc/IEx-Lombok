import React from 'react';

interface Post {
  author: string;
  title: string;
  content: string;
  date_posted: string;
}

const Home: React.FC = () => {
  const posts: Post[] = [
    {
      author: 'jason lee',
      title: 'hawksbill sighting!',
      content: 'first post',
      date_posted: '21 July 2025'
    },
    {
      author: 'justin lee',
      title: 'green turtle sighting!',
      content: 'second post',
      date_posted: '22 July 2025'
    }
  ];

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Shell-utions
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            by Jason, Dowon, Yu Tong, Ebelle & Shanti
          </p>
        </div>

        {/* Posts Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Sightings</h2>
          <div className="space-y-6">
            {posts.map((post, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                  <span className="text-sm text-gray-500">{post.date_posted}</span>
                </div>
                <p className="text-gray-700 mb-2">{post.content}</p>
                <p className="text-sm text-gray-500">Posted by {post.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
