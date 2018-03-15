import dash_materialsintelligence as dmi
import dash
import dash_html_components as html
from dash.dependencies import Input, Output, State
import pprint
import random

app = dash.Dash('')

app.css.append_css({"external_url": "https://codepen.io/chriddyp/pen/bWLwgP.css"})
app.config.suppress_callback_exceptions = True

app.scripts.config.serve_locally = True

testTokens = []

testTokens.append([[{'id': 'token-0-2', 'text': 'ab', 'start': 0, 'end': 2, 'annotation': None},
               {'id': 'token-3-5', 'text': 'cd', 'start': 3, 'end': 5, 'annotation': None},
               {'id': 'token-6-8', 'text': 'ef', 'start': 6, 'end': 8, 'annotation': 'label-2'},
               {'id': 'token-8-9', 'text': '.', 'start': 8, 'end': 9, 'annotation': None},
               {'id': 'token-10-12', 'text': 'gf', 'start': 10, 'end': 12, 'annotation': 'label-1'}],
               [{'id': 'token-0-2', 'text': 'AB', 'start': 0, 'end': 2, 'annotation': None},
               {'id': 'token-3-5', 'text': 'CD', 'start': 3, 'end': 5, 'annotation': None},
               {'id': 'token-6-8', 'text': 'EF', 'start': 6, 'end': 8, 'annotation': None},
               {'id': 'token-8-9', 'text': '.', 'start': 8, 'end': 9, 'annotation': 'label-4'},
               {'id': 'token-10-12', 'text': 'GF', 'start': 10, 'end': 12, 'annotation': None}],
              [{'id': 'token-0-2', 'text': 'AB', 'start': 0, 'end': 2, 'annotation': None},
               {'id': 'token-3-5', 'text': 'CD', 'start': 3, 'end': 5, 'annotation': None},
               {'id': 'token-6-8', 'text': 'EF', 'start': 6, 'end': 8, 'annotation': None},
               {'id': 'token-8-9', 'text': '.', 'start': 8, 'end': 9, 'annotation': 'label-3'},
               {'id': 'token-10-12', 'text': 'GF', 'start': 10, 'end': 12, 'annotation': None}]])

testTokens.append([[{'id': 'token-0-2', 'text': 'AB', 'start': 0, 'end': 2, 'annotation': None},
               {'id': 'token-3-5', 'text': 'CD', 'start': 3, 'end': 5, 'annotation': None},
               {'id': 'token-6-8', 'text': 'EF', 'start': 6, 'end': 8, 'annotation': 'label-2'},
               {'id': 'token-8-9', 'text': ',', 'start': 8, 'end': 9, 'annotation': None},
               {'id': 'token-10-12', 'text': 'GF', 'start': 10, 'end': 12, 'annotation': 'label-1'}],
               [{'id': 'token-0-2', 'text': 'ab', 'start': 0, 'end': 2, 'annotation': None},
               {'id': 'token-3-5', 'text': 'cd', 'start': 3, 'end': 5, 'annotation': None},
               {'id': 'token-6-8', 'text': 'ef', 'start': 6, 'end': 8, 'annotation': None},
               {'id': 'token-8-9', 'text': ',', 'start': 8, 'end': 9, 'annotation': 'label-4'},
               {'id': 'token-10-12', 'text': 'gf', 'start': 10, 'end': 12, 'annotation': None}],
              [{'id': 'token-0-2', 'text': 'ab', 'start': 0, 'end': 2, 'annotation': None},
               {'id': 'token-3-5', 'text': 'cd', 'start': 3, 'end': 5, 'annotation': None},
               {'id': 'token-6-8', 'text': 'ef', 'start': 6, 'end': 8, 'annotation': None},
               {'id': 'token-8-9', 'text': ',', 'start': 8, 'end': 9, 'annotation': 'label-3'},
               {'id': 'token-10-12', 'text': 'gf', 'start': 10, 'end': 12, 'annotation': None}]])

testLabels = [{'text': 'Material', 'value': 'label-1'},
              {'text': 'Inorganic Crystal', 'value': 'label-2'},
              {'text': 'Main Material', 'value': 'label-3'}]


def serve_layout(doi="none", tokens=testTokens[0]):
    return html.Div([
        dmi.AnnotationContainer(
            doi=doi,
            tokens=tokens,
            className="testClass",
            id="annotation_container",
            labels=testLabels,
            selectedValue=testLabels[1]["value"]
        ),
        dmi.DropdownCreatable(
            options=[
                {'value': 'R', 'label': 'Red'},
                {'value': 'G', 'label': 'Green'},
                {'value': 'B', 'label': 'Blue'}],
            multi=True,
            id="tags_selector",
            value=None,
        ),
        html.Div("doi is " + doi, id="test_output"),
        html.Div(html.Button("Confirm", id="annotate_confirm"))
])

app.layout = html.Div(serve_layout(),id="content")

# @app.callback(
#     dash.dependencies.Output('output', 'children'),
#     [dash.dependencies.Input('input', 'value')])
# def display_output(value):
#     return 'You have clicked {} times'.format(value)


"""
Annotation App Callbacks
"""
@app.callback(
    Output('content', 'children'),
    [Input('annotate_confirm', 'n_clicks')],
    [State('annotation_container', 'tokens'),
     State('tags_selector', 'value')])
def load_next_abstract(
        n_clicks,
        tokens,
        tags):
    doi="none"
    if n_clicks is not None:
        pprint.pprint(tokens)
        pprint.pprint(tags)
        # do something to record the annotation
        doi = str(random.randint(1, 100000))
        tokens = testTokens[random.randint(1, 2) - 1]
    return serve_layout(doi=doi, tokens=tokens)


if __name__ == '__main__':
    app.run_server(debug=True)

