using System;
using System.Collections.Generic;

namespace Composite.Search.DocumentSources
{
    internal class IndexUpdateActionContainer : IDisposable
    {
        private List<Action> _actions;

        public void Add(Action action)
        {
            if (_actions == null) _actions = new List<Action>();

            _actions.Add(action);
        }

        public void Dispose()
        {
            if (_actions == null) return;

            foreach (var action in _actions)
            {
                action();
            }
        }
    }
}
