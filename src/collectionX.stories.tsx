import { Observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';
import { collectionX } from './';
import { createVM } from './createVM';
import { getUsers } from './mocks';

const collection = collectionX({ getList: getUsers, createVM, defaultValue: { name: 'default_name_of_user ' + nanoid().slice(0, 3) } });

export const Demo = () => {
  return (
    <Observer>
      {() => {
        return (
          <section style={{ display: 'flex', border: '1px solid gray', padding: '10px' }}>
            <div onClick={() => collection.add()}>add new</div>
            <div>
              {collection.vms.get().map(vm => (
                <vm.Render key={vm.id} />
              ))}
            </div>
          </section>
        );
      }}
    </Observer>
  );
};
