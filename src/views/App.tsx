import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import UserManagement from './UserManagement';
import UserForm from './UserForm';
import ProtectedRoute from '../ProtectedRoute';
import RestrictedLayout from '../layout/RestrictedLayout';

/*Componente= sempre retorna um html, os componentes sempre terminam em X, exemplo: tsx, o tsx é um componente e o que não
termina em X não é um componente.
Class= é uma palavra reservada. Um ponto só */

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota de Login */}
        <Route path="/login" element={<Login />} />
        {/* Rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RestrictedLayout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/users/new" element={<UserForm />} />
            <Route path="/users/edit/:id" element={<UserForm isEditing />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
