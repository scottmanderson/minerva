import json

json_constant_map = {
    "-Infinity": float("-Infinity"),
    "Infinity": float("Infinity"),
    "NaN": None,
}


def json_nan_to_none(obj, *, default=None):
    # We want to convert NaNs to None and we have to use for now this workaround.
    # We still want an exception for infinity and -infinity.
    # See: https://github.com/python/cpython/pull/13233
    json_string = json.dumps(obj, default=default)
    return json.loads(
        json_string,
        parse_constant=lambda constant: json_constant_map[constant],
    )
