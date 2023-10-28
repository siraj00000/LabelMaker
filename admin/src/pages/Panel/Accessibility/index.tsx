// import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { decrement, increment } from '../../../feature/couter/counterSlice';
import useAuth from '../../../hooks/useAuth';

const Accessibility = () => {
  const { role } = useAuth();
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch();
  console.log(role);
  return (
    <div>
      <h1>Accessibility</h1>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Add</button>
      <button onClick={() => dispatch(decrement())}>Sub</button>
    </div>
  )
}

export const accessibilityAction = async () => {
  return null
}

export const accessibilityLoader = async () => {
  return null
}

export default Accessibility
