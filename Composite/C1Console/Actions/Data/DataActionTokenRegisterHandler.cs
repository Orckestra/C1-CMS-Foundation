using System;
using Composite.C1Console.Security;
using Composite.Data;

namespace Composite.C1Console.Actions.Data
{
    abstract class DataActionTokenRegisterHandler
    {
        public abstract ActionToken GetActionToken();

        public abstract bool Check(Type type,IData data, ActionIdentifier actionIdentifier);
    }

    class DataActionTokenRegisterHandler<T> : DataActionTokenRegisterHandler where T : IData
    {
        private readonly ActionToken _actionToken;
        private readonly ActionIdentifier _actionIdentifier;
        private readonly Func<T, bool> _actionValidPredicate;

        public DataActionTokenRegisterHandler(ActionIdentifier actionIdentifier, ActionToken dataActionToken)
        {
            _actionToken = dataActionToken;
            _actionIdentifier = actionIdentifier;
        }

        public DataActionTokenRegisterHandler(ActionIdentifier actionIdentifier, ActionToken dataActionToken, Func<T, bool> actionValidPredicate) : this(actionIdentifier, dataActionToken)
        {
            _actionValidPredicate = actionValidPredicate;
        }

        public override ActionToken GetActionToken()
        {
            return _actionToken;
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