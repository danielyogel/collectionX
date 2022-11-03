import { observable } from 'mobx';
import { Observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';

type Params = {
  value: { id: string; name: string };
  onRemove: () => void;
};
export function createVM({ value, onRemove }: Params) {
  const _value = observable.box(value);

  const Render = () => {
    return (
      <Observer>
        {() => {
          return (
            <div style={{ padding: '20px', margin: '20px', border: '1px solid green' }}>
              <div>{_value.get().name}</div>
              <div onClick={() => _value.set({ ..._value.get(), name: 'new-name ' + nanoid().slice(0, 4) })}>change</div>
              <div onClick={onRemove}>delete</div>
            </div>
          );
        }}
      </Observer>
    );
  };

  return { id: value.id, value: _value, Render };
}
