import React from 'react'; //importa o react. Necessário para criar componentes em arquivos .jsxx ou tsx
import PropTypes from 'prop-types'; //importa prop types(tipos de propriedade) para validar os tipos das propriedades recebidas pelo componente

export default function Calendar({
  //define um componente funcional chamado Calendar e o exporta como padrão, e ele recebe várias propriedades:
  label, //texto opcional a ser exibido acima do input
  value, //valor atual do input (controlado externamente)
  onChange, //função chamada quando o valor muda
  error = '', //texto opcional de erro
  className = '', // classes extras de estilo padrão
  ...props //captura qualquer outra propriedade extra e repassa para o input
}) {
  return (
    //retorna o JSX do componente
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type="date"
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

Calendar.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  className: PropTypes.string,
};

Calendar.defaultProps = {
  label: '',
  error: '',
  className: '',
};
