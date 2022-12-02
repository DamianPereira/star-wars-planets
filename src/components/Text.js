import classNames from 'classnames';

export const Text = ({ loading, header, label, className, children, ...props }) => {
  const Tag = header ? 'h1' : label ? 'span' : 'p';
  return (
    <Tag
      className={classNames(className, 'text-gray-100', {
        'bg-gray-200 text-transparent rounded-md': loading,
        'text-4xl font-distant-galaxy-outline': header,
        'font-distant-galaxy mr-2 tracking-wider leading-7': label,
      })}
      {...props}
    >
      {children || '\u00A0'}
    </Tag>
  );
};
