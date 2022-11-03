import { observable } from 'mobx';
import { nanoid } from 'nanoid';
import { Except } from 'type-fest';

type Base = {
  id: string;
};

type Params<V extends Base, VM extends Base> = {
  getList: () => Promise<V[]>;
  createVM: (p: { value: V; onRemove: () => void }) => VM;
  defaultValue: Except<V, 'id'>;
};

export function collectionX<V extends Base, VM extends Base>({ createVM, defaultValue, getList }: Params<V, VM>) {
  const vms = observable.box<VM[]>([]);

  // initial sync ...
  (async function Init() {
    const res = await getList();

    res.forEach(item => {
      const newVM = createVM({
        value: item,
        onRemove: () => {
          const newVms = vms.get().filter(v => v.id !== item.id);
          vms.set(newVms);
        }
      });

      vms.set([...vms.get(), newVM]);
    });
  })();

  const add = (value?: V) => {
    const _value = { ...(value || { ...(defaultValue as V), id: nanoid() }) };

    const newVM = createVM({
      value: _value,
      onRemove: () => {
        const newVms = vms.get().filter(v => v.id !== _value.id);
        vms.set(newVms);
      }
    });

    vms.set([...vms.get(), newVM]);
  };

  const remove = (id: string) => {
    const newVms = vms.get().filter(v => v.id !== id);
    vms.set(newVms);
  };

  return { vms, add, remove };
}
