import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function UserPage() {
  const user = useSelector((storeState) => storeState.userModule.loggedinUser);
  const navigate = useNavigate()

  useEffect(() => {
    if(!user) navigate('/login')
  }, [])

  return <section className="user-page">
    <h2>hello {user}!</h2>
  </section>;
}
