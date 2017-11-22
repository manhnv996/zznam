function ccw(x, y, z) {
    return (z.y-x.y) * (y.x-x.x) >= (y.y-x.y) * (z.x-x.x);
}

// Tests for intersection between line segments AB and CD.
function intersection(a, b, c, d) {
    return ccw(a, c, d) !== ccw(b, c, d) && ccw(a, b, c) !== ccw(a, b, d);
}

// Performs ray casting, testing if point P falls within a polygonal region.
// @param p: The point to test.
// @param poly: An array of points forming a polygonal shape.
// @return: true if point falls within polygon.
function rayCasting(p, poly) {
    var sides = poly.length,
        origin = {x:0, y:p.y},
        hits = 0,
        s1,
        s2,
        i;

    // Test intersection of an external ray against each polygon side.
    for (i = 0; i < sides; i++) {
        s1 = poly[i];
        s2 = poly[(i+1) % sides];
        origin.x = Math.min(origin.x, Math.min(s1.x, s2.x)-1);
        hits += (intersection(origin, p, s1, s2) ? 1 : 0);
    }

    // Return true if an odd number of hits were found.
    return hits % 2 > 0;
}
