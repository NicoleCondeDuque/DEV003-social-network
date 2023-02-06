// importamos la funcion que vamos a testear

import {
  functionSignUp, functionSignin, functionUserGoogle, saveTask,
} from '../src/lib/index';

jest.mock('@firebase/auth', () => (
  {
    createUserWithEmailAndPassword: () => Promise.resolve({ currentUser: 'string' }),
    updateProfile: () => ({}),
    getAuth: () => ({ currentUser: 'string' }),
    signInWithEmailAndPassword: () => Promise.resolve({ user: 'string' }),
    GoogleAuthProvider: class {},
    signInWithPopup: () => Promise.resolve({ user: 'stringGoogle' }),
  }
));
jest.mock('@firebase/firestore', () => (
  {
    addDoc: () => Promise.resolve({ tittle: 'Quesadilla', description: 'Jamon', displayName: 'Pedro' }),
    collection: () => {},
    getFirestore: () => ({ }),
  }
));
jest.mock('../src/lib/firebase.js');
// * -----Test para functionSignUp -----*/

describe('functionSignUp', () => {
  it('deberia crear un usuario', async () => {
    const userCredential = functionSignUp('Prueba', 'prueba@hotmail.com', '123456');
    await expect(userCredential).resolves.toEqual({ currentUser: 'string' });
  });

  it('deberia dar error al no llenar completos los campos', async () => functionSignUp('', '', '').then((userCredential) => {
    expect(userCredential).toEqual({ currentUser: 'string' });
  }));
});

/* -----Test para functionSignIn -----*/

describe('functionSignIn', () => {
  it('deberia iniciar sesion con el usuario registrado', async () => {
    const userLogin = functionSignin('prueba@hotmail.com', '123456');
    await expect(userLogin).resolves.toEqual('string');
  });
});

/* -----Test para function Google -----*/

describe('functionUserGoogle', () => {
  it('deberia iniciar sesion con el usuario registrado', async () => {
    const userGoogle = functionUserGoogle('prueba@hotmail.com', '123456');
    await expect(userGoogle).resolves.toEqual({ user: 'stringGoogle' });
  });
});

/* -----Test para function saveTask -----*/

describe('funcion de saveTask', () => {
  it('deberia guardar los post', async () => {
    const postt = saveTask('Quesadilla', 'Jamon', 'Pedro');
    await expect(postt).resolves.toEqual({ tittle: 'Quesadilla', description: 'Jamon', displayName: 'Pedro' });
  });
});
