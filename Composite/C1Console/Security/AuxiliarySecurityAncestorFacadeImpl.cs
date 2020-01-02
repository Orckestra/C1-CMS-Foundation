using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Extensions;


namespace Composite.C1Console.Security
{
    internal sealed class AuxiliarySecurityAncestorFacadeImpl : IAuxiliarySecurityAncestorFacade
    {
        private Dictionary<Type, List<IAuxiliarySecurityAncestorProvider>> _auxiliarySecurityAncestorProviders = new Dictionary<Type, List<IAuxiliarySecurityAncestorProvider>>();
        private Dictionary<Type, List<IAuxiliarySecurityAncestorProvider>> _flushPersistentAuxiliarySecurityAncestorProviders = new Dictionary<Type, List<IAuxiliarySecurityAncestorProvider>>();


        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            Verify.ArgumentNotNull(entityToken, nameof(entityToken));


            List<IAuxiliarySecurityAncestorProvider> auxiliarySecurityAncestorProviders;
            List<IAuxiliarySecurityAncestorProvider> flushPersistentAuxiliarySecurityAncestorProviders;

            _auxiliarySecurityAncestorProviders.TryGetValue(entityToken.GetType(), out auxiliarySecurityAncestorProviders);
            _flushPersistentAuxiliarySecurityAncestorProviders.TryGetValue(entityToken.GetType(), out flushPersistentAuxiliarySecurityAncestorProviders);

            IEnumerable<IAuxiliarySecurityAncestorProvider> resultSecurityAncestorProviders = auxiliarySecurityAncestorProviders.ConcatOrDefault(flushPersistentAuxiliarySecurityAncestorProviders);

            if (resultSecurityAncestorProviders == null) return null;


            IEnumerable<EntityToken> totalResult = null;
            foreach (IAuxiliarySecurityAncestorProvider auxiliarySecurityAncestorProvider in resultSecurityAncestorProviders)
            {
                var result = auxiliarySecurityAncestorProvider.GetParents(new [] { entityToken });

                if (result.Count > 0)
                {
                    totalResult = totalResult.ConcatOrDefault(result.Values.First());
                }
            }

            return totalResult;
        }



        public void AddAuxiliaryAncestorProvider(Type entityTokenType, IAuxiliarySecurityAncestorProvider auxiliarySecurityAncestorProvider, bool flushPersistent)
        {
            var providers = !flushPersistent 
                ? _auxiliarySecurityAncestorProviders 
                : _flushPersistentAuxiliarySecurityAncestorProviders;

            List<IAuxiliarySecurityAncestorProvider> auxiliarySecurityAncestorProviders;

            if (!providers.TryGetValue(entityTokenType, out auxiliarySecurityAncestorProviders))
            {
                auxiliarySecurityAncestorProviders = new List<IAuxiliarySecurityAncestorProvider>();
                providers.Add(entityTokenType, auxiliarySecurityAncestorProviders);
            }

            if (auxiliarySecurityAncestorProviders.Contains(auxiliarySecurityAncestorProvider))
            {
                throw new ArgumentException("The given provider has already been added with the given entity token", nameof(auxiliarySecurityAncestorProvider));
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
        }



        public void Flush()
        {
            _auxiliarySecurityAncestorProviders = new Dictionary<Type, List<IAuxiliarySecurityAncestorProvider>>();
        }
    }
}
