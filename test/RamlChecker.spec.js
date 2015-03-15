/*global require,describe,it,expect,RamlChecker*/

describe('RamlChecker', () => {
    describe('first', () => {
        it('should run', ()=> {
            let c = new RamlChecker();
            expect(c).toBeDefined();
            expect(null).toBe(null);
        });
    });
});
