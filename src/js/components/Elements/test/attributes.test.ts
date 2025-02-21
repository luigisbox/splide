import { ALL_ATTRIBUTES, ARIA_ROLEDESCRIPTION, ROLE, TAB_INDEX } from '../../../constants/attributes';
import { buildHtml, init } from '../../../test';


describe( 'Elements', () => {
  test( 'can assign aria attributes.', () => {
    const splide = init();
    expect( splide.root.getAttribute( ROLE ) ).toBe( 'region' );
    expect( splide.root.getAttribute( ARIA_ROLEDESCRIPTION ) ).toBe( 'carousel' );
  } );

  test( 'can remove assigned attributes.', () => {
    const splide = init( { keyboard: 'focused' } );
    const { root, track, list } = splide.Components.Elements;

    expect( root.getAttribute( TAB_INDEX ) ).not.toBeNull();

    splide.destroy();

    const attributes = ALL_ATTRIBUTES.concat( 'style' );
    const callback   = jest.fn();

    [ root, track, list ].forEach( elm => {
      attributes.forEach( attr => {
        expect( elm.getAttribute( attr ) ).toBeNull();
        callback();
      } );
    } );

    expect( callback ).toHaveBeenCalledTimes( attributes.length * 3 );
  } );

  test( 'should not assign the role if the root element is section.', () => {
    const splide = init( {}, { html: buildHtml( { tag: 'section' } ) } );
    expect( splide.root.getAttribute( ROLE ) ).toBeNull();
  } );
} );
