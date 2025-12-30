import { AppDispatch } from '../store';
import { resetNavigation, setActiveModule } from '../slices/uiSlice';

export const handleSelectModule =
  (
    moduleId: string | null,
    context?: { workflow: string; subMenu?: string }
  ) =>
  (dispatch: AppDispatch) => {
    if (!moduleId) {
      dispatch(resetNavigation());
      return;
    }

    dispatch(
      setActiveModule({
        moduleId,
        context,
      })
    );
  };