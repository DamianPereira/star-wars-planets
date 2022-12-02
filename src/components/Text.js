import classNames from 'classnames';

export const Text = ({ loading, header, label, className, children, ...props }) => {
  const Tag = header ? 'h1' : label ? 'span' : 'p';
  return (
    <Tag
      className={classNames(className, {
        'bg-gray-200 text-transparent rounded-md animate-pulse': loading,
        'text-4xl font-distant-galaxy-outline': header,
        'font-distant-galaxy mr-2 tracking-wider leading-7': label,
        'text-gray-100': !loading,
      })}
      {...props}
    >
      {children || '\u00A0'}
    </Tag>
  );
};
