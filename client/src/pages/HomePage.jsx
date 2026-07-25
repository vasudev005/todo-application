import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>

      <nav>
        <h1>My Website</h1>

        <Link to="/login">
          <button>Sign In</button>
        </Link>
      </nav>

      <section>
        <h2>About Us</h2>
        <p>
          We provide modern task management solutions.
        </p>
      </section>

      <section>
        <h2>Pricing</h2>

        <div>
          <h3>Basic</h3>
          <p>₹499/month</p>
        </div>

        <div>
          <h3>Premium</h3>
          <p>₹999/month</p>
        </div>
      </section>

    </div>
  );
};

export default HomePage;