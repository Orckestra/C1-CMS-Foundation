using System;
using System.Linq;

namespace Composite.Plugins.Logging.LogTraceListeners.FileLogTraceListener
{
    class CircularList<T> where T: class
    {
        private readonly T[] _data;
        private readonly int _size;

        private int _position;

        public CircularList(int size)
        {
            _data = new T[size];
            _size = size;
        }

        public int Count => (_position > _size) ? _size : _position;

        public void Add(T element)
        {
            _data[_position % _size] = element;
            _position++;
        }

        public T First()
        {
            return _position == 0 ? null : _data[Offset(_position - 1)];
        }

        public T[] ToArray()
        {
            if (_position <= _size)
            {
                return _data.Take(_position).ToArray();
            }

            var insertPosition = Offset(_position);

            var result = new T[_size];

            Array.Copy(_data, insertPosition, result, 0, _size - insertPosition);
            Array.Copy(_data, 0, result, _size - insertPosition, insertPosition);

            return result;
        }

        private int Offset(int position) => position % _size;
    }
}
