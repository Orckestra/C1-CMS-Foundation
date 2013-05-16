using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Extensions;
using Composite.Core.Linq;


namespace Composite.C1Console.Security
{
    internal sealed class AuxiliarySecurityAncestorFacadeImpl : IAuxiliarySecurityAncestorFacade
    {
        private Dictionary<Type, List<IAuxiliarySecurityAncestorProvider>> _auxiliarySecurityAncestorProviders = new Dictionary<Type, List<IAuxiliarySecurityAncestorProvider>>();
        private Dictionary<Type, List<IAuxiliarySecurityAncestorProvider>> _flushPersistentAuxiliarySecurityAncestorProviders = new Dictionary<Type, List<IAuxiliarySecurityAncestorProvider>>();


        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            if (entityToken == null) throw new ArgumentNullException("entityToken");


            List<IAuxiliarySecurityAncestorProvider> auxiliarySecurityAncestorProviders;
            List<IAuxiliarySecurityAncestorProvider> flushPersistentAuxiliarySecurityAncestorProviders;

            _auxiliarySecurityAncestorProviders.TryGetValue(entityToken.GetType(), out auxiliarySecurityAncestorProviders);
            _flushPersistentAuxiliarySecurityAncestorProviders.TryGetValue(entityToken.GetType(), out flushPersistentAuxiliarySecurityAncestorProviders);

            IEnumerable<IAuxiliarySecurityAncestorProvider> resultSecurityAncestorProviders = auxiliarySecurityAncestorProviders.ConcatOrDefault(flushPersistentAuxiliarySecurityAncestorProviders);

            if (resultSecurityAncestorProviders == null) return null;


            IEnumerable<EntityToken> totalResult = null;
            foreach (IAuxiliarySecurityAncestorProvider auxiliarySecurityAncestorProvider in resultSecurityAncestorProviders)
            {
                Dictionary<EntityToken, IEnumerable<EntityToken>> result = auxiliarySecurityAncestorProvider.GetParents(new EntityToken[] { entityToken });

                if (result.Count > 0)
                {
                    var firstValue = result.Values.First();

                    if (totalResult == null)
                    {
                        totalResult = firstValue;
                    }
                    else
                    {
                        totalResult = totalResult.Concat(firstValue);
                    }
                }
            }

            return totalResult;
        }



        public void AddAuxiliaryAncestorProvider(Type entityTokenType, IAuxiliarySecurityAncestorProvider auxiliarySecurityAncestorProvider, bool flushPersistent)
        {
            Dictionary<Type, List<IAuxiliarySecurityAncestorProvider>> providers;
            if (!flushPersistent)
            {
                providers = _auxiliarySecurityAncestorProviders;
            }
            else
            {
                providers = _flushPersistentAuxiliarySecurityAncestorProviders;
            }

            List<IAuxiliarySecurityAncestorProvider> auxiliarySecurityAncestorProviders;

            if (providers.TryGetValue(entityTokenType, out auxiliarySecurityAncestorProviders) == false)
            {
                auxiliarySecurityAncestorProviders = new List<IAuxiliarySecurityAncestorProvider>();
                providers.Add(entityTokenType, auxiliarySecurityAncestorProviders);
            }

            if (auxiliarySecurityAncestorProviders.Contains(auxiliarySecurityAncestorProvider))
            {
                throw new ArgumentNullException("The given auxiliarySecurityAncestorProvider has already been added with the given entity token");
            }

            auxiliarySecurityAncestorProviders.Add(auxiliarySecurityAncestorProvider);
        }



        public void RemoveAuxiliaryAncestorProvider(Type entityTokenType, IAuxiliarySecurityAncestorProvider auxiliarySecurityAncestorProvider)
        {
            List<IAuxiliarySecurityAncestorProvider> auxiliarySecurityAncestorProviders;

            if (_auxiliarySecurityAncestorProviders.TryGetValue(entityTokenType, out auxiliarySecurityAncestorProviders))
            {
                auxiliarySecurityAncestorProviders.Remove(auxiliarySecurityAncestorProvider);
            }

            if (_flushPersistentAuxiliarySecurityAncestorProviders.TryGetValue(entityTokenType, out auxiliarySecurityAncestorProviders))
            {
                auxiliarySecurityAncestorProviders.Remove(auxiliarySecurityAncestorProvider);
            }
        }



        public IEnumerable<IAuxiliarySecurityAncestorProvider> GetAuxiliaryAncestorProviders(Type entityTokenType)
        {
            List<IAuxiliarySecurityAncestorProvider> auxiliarySecurityAncestorProviders;

            if (_auxiliarySecurityAncestorProviders.TryGetValue(entityTokenType, out auxiliarySecurityAncestorProviders))
            {
                foreach (IAuxiliarySecurityAncestorProvider auxiliarySecurityAncestorProvider in auxiliarySecurityAncestorProviders)
                {
                    yield return auxiliarySecurityAncestorProvider;
                }
            }


            if (_flushPersistentAuxiliarySecurityAncestorProviders.TryGetValue(entityTokenType, out auxiliarySecurityAncestorProviders))
            {
                foreach (IAuxiliarySecurityAncestorProvider auxiliarySecurityAncestorProvider in auxiliarySecurityAncestorProviders)
                {
                    yield return auxiliarySecurityAncestorProvider;
                }
            }

            yield break;
        }



        public void Flush()
        {
            _auxiliarySecurityAncestorProviders = new Dictionary<Type, List<IAuxiliarySecurityAncestorProvider>>();
        }
    }
}
