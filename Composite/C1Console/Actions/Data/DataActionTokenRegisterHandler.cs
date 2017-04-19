using System;
using Composite.C1Console.Security;
using Composite.Data;

namespace Composite.C1Console.Actions.Data
{
    abstract class DataActionTokenRegisterHandler
    {
        public abstract ActionToken GetActionToken(IData data);

        public abstract bool Check(Type type,IData data, ActionIdentifier actionIdentifier);
    }

    class DataActionTokenRegisterHandler<T> : DataActionTokenRegisterHandler where T : IData
    {
        private readonly Func<T, ActionToken> _actionTokenFunc;
        private readonly ActionIdentifier _actionIdentifier;
        private readonly Func<T, bool> _actionValidPredicate;

        public DataActionTokenRegisterHandler(ActionIdentifier actionIdentifier, Func<T, ActionToken> dataActionToken)
        {
            _actionTokenFunc = dataActionToken;
            _actionIdentifier = actionIdentifier;
        }

        public DataActionTokenRegisterHandler(ActionIdentifier actionIdentifier, Func<T, ActionToken> dataActionToken, Func<T, bool> actionValidPredicate) : this(actionIdentifier, dataActionToken)
        {
            _actionValidPredicate = actionValidPredicate;
        }

        public override ActionToken GetActionToken(IData data)
        {
            return _actionTokenFunc((T)data);
        }

        public override bool Check(Type type, IData data, ActionIdentifier actionIdentifier)
        {
            if (_actionIdentifier == actionIdentifier)
            {
                if (type == typeof(T))
                {
                    if (_actionValidPredicate == null || _actionValidPredicate((T) data))
                    {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}